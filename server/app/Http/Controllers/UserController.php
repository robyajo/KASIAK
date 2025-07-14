<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Http\Traits\ApiResponse;
use Illuminate\Support\Facades\Validator;
use Intervention\Image\Laravel\Facades\Image;

class UserController extends Controller
{
    use ApiResponse;
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $users = User::with(['roles'])->orderBy('id', 'desc')->get();
            $formattedUsers = $users->map(function ($user) {
                return $user->formatForApi();
            });

            return $this->successResponse($formattedUsers, 'Users retrieved successfully');
        } catch (\Throwable $th) {
            return $this->errorResponse($th->getMessage(), 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'name' => 'required|string|max:200|unique:users,name',
                'role' => 'required',
                'verified' => 'required',
                'email' => 'required|email|unique:users,email',
                'password' => 'required',
                'c_password' => 'required|same:password',
            ],
            [
                'name.required' => 'Name permission required.',
                'name.string' => 'Name permission must be string.',
                'name.max' => 'Name permission must be less than 200 characters.',
                'name.unique' => 'Name permission must be unique.',
                'role.required' => 'Role permission required.',
                'email.required' => 'Email permission required.',
                'email.email' => 'Email permission must be email.',
                'email.unique' => 'Email permission must be unique.',
                'verified.required' => 'Verified permission required.',
                'password.required' => 'Password permission required.',
                'c_password.required' => 'Confirm password permission required.',
                'c_password.same' => 'Confirm password permission must be same with password.',
            ]
        );

        if ($validator->fails()) {
            return $this->validationErrorResponse($validator->errors()->all(), 'Validation failed');
        }

        try {
            $data = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'verified' => $request->verified,
            ]);
            $data->assignRole($request->role);
            return $this->successResponse($data, 'User created successfully');
        } catch (\Throwable $th) {
            return $this->errorResponse($th->getMessage(), 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $uuid)
    {
        try {
            $user = User::with(['roles'])->where('uuid', $uuid)->first();
            if (!$user) {
                return $this->notFoundResponse('User not found');
            }
            return $this->successResponse($user, 'User retrieved successfully');
        } catch (\Throwable $th) {
            return $this->errorResponse($th->getMessage(), 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $uuid)
    {
        try {
            $user = User::where('uuid', $uuid)->first();
            if (!$user) {
                return $this->notFoundResponse('User not found');
            }
            $validator = Validator::make(
                $request->all(),
                [
                    'name' => 'required|string|max:200|unique:users,name,' . $user->id,
                    'role' => 'required',
                    'verified' => 'required',
                    'email' => 'required|email|unique:users,email,' . $user->id,
                ],
                [
                    'name.required' => 'Name permission required.',
                    'name.unique' => 'Name permission must be unique.',
                    'name.string' => 'Name permission must be string.',
                    'name.max' => 'Name permission must be less than 200 characters.',
                    'role.required' => 'Role permission required.',
                    'email.required' => 'Email permission required.',
                    'email.email' => 'Email permission must be email.',
                    'email.unique' => 'Email permission must be unique.',
                    'verified.required' => 'Verified permission required.',
                ]
            );
            if ($validator->fails()) {
                return $this->validationErrorResponse($validator->errors()->all(), 'Validation failed');
            }
            $user->update([
                'name' => $request->name,
                'email' => $request->email,
                'verified' => $request->verified,
            ]);
            $user->syncRoles($request->role);
            return $this->successResponse($user, 'User updated successfully');
        } catch (\Throwable $th) {
            return $this->errorResponse($th->getMessage(), 500);
        }
    }
    public function uploadAvatar(Request $request, string $uuid)
    {
        try {
            $user = User::where('uuid', $uuid)->first();
            if (!$user) {
                return $this->notFoundResponse('User not found');
            }
            $validator = Validator::make(
                $request->all(),
                [
                    'avatar' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
                ],
                [
                    'avatar.required' => 'Avatar permission required.',
                    'avatar.image' => 'Avatar permission must be image.',
                    'avatar.mimes' => 'Avatar permission must be jpeg,png,jpg,gif,svg.',
                    'avatar.max' => 'Avatar permission must be less than 2048 characters.',
                ]
            );
            if ($validator->fails()) {
                return $this->validationErrorResponse($validator->errors()->all(), 'Validation failed');
            }
            // Create directories if they don't exist
            $destinationPath = storage_path('app/public/images/user');
            $destinationPathThumbnail = $destinationPath . '/thumbnail';

            if (!file_exists($destinationPath)) {
                mkdir($destinationPath, 0777, true);
            }
            if (!file_exists($destinationPathThumbnail)) {
                mkdir($destinationPathThumbnail, 0777, true);
            }

            // Delete old avatar files if they exist
            if ($user->avatar) {
                $oldAvatarPath = $destinationPath . '/' . $user->avatar;
                $oldThumbnailPath = $destinationPathThumbnail . '/' . $user->avatar;

                if (file_exists($oldAvatarPath)) {
                    unlink($oldAvatarPath);
                }
                if (file_exists($oldThumbnailPath)) {
                    unlink($oldThumbnailPath);
                }
            }

            // Generate unique filename
            $imageName = time() . '_' . uniqid() . '.' . $request->file('avatar')->extension();

            // Save original image
            $request->file('avatar')->move($destinationPath, $imageName);

            // Create and save thumbnail
            $img = Image::read($destinationPath . '/' . $imageName);
            $img->resize(100, 100, function ($constraint) {
                $constraint->aspectRatio();
                $constraint->upsize();
            })->save($destinationPathThumbnail . '/' . $imageName);

            // Update user with new avatar
            $user->update([
                'avatar' => $imageName,
                'path_avatar' => 'images/user/' . $imageName
            ]);
            return $this->successResponse($user, 'User updated successfully');
        } catch (\Throwable $th) {
            return $this->errorResponse($th->getMessage(), 500);
        }
    }
    public function changePassword(Request $request, string $uuid)
    {
        try {
            $user = User::where('uuid', $uuid)->first();
            if (!$user) {
                return $this->notFoundResponse('User not found');
            }
            $validator = Validator::make(
                $request->all(),
                [
                    'password' => 'required',
                    'c_password' => 'required|same:password',
                ],
                [
                    'password.required' => 'Password permission required.',
                    'c_password.required' => 'Confirm password permission required.',
                    'c_password.same' => 'Confirm password permission must be same with password.',
                ]
            );
            if ($validator->fails()) {
                return $this->validationErrorResponse($validator->errors()->all(), 'Validation failed');
            }
            $user->update([
                'password' => Hash::make($request->password),
            ]);
            return $this->successResponse($user, 'User updated successfully');
        } catch (\Throwable $th) {
            return $this->errorResponse($th->getMessage(), 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $uuid)
    {
        try {
            $user = User::where('uuid', $uuid)->first();
            if (!$user) {
                return $this->notFoundResponse('User not found');
            }
            $user->delete();
            return $this->successResponse([], 'User deleted successfully');
        } catch (\Throwable $th) {
            return $this->errorResponse($th->getMessage(), 500);
        }
    }
}
