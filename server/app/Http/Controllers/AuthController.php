<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
use Spatie\Permission\Models\Permission;
use App\Http\Traits\ApiResponse;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    use ApiResponse;
    public function permission()
    {
        try {
            $user = Auth::user();
            $roleName = $user->roles->first()->name ?? null;
            if (!$user) {
                return $this->notFoundResponse('User tidak terautentikasi');
            }
            $user = User::find($user->id);
            if ($roleName == 'Super Admin') {
                $permissions = Permission::get()->map(function ($permission) {
                    return [
                        'id' => $permission->id,
                        'name' => $permission->name
                    ];
                });
            } else {
                $permissions = $user->getPermissionsViaRoles()->map(function ($permission) {
                    return [
                        'id' => $permission->id,
                        'name' => $permission->name
                    ];
                });
            }

            return $this->successResponse([
                'permissions' => $permissions,
                'role' => $roleName,
            ], 'Detail User');
        } catch (\Exception $e) {
            return $this->errorResponse('Terjadi kesalahan server: ' . $e->getMessage(), 500);
        }
    }
    /**
     * Login pengguna
     * @unauthenticated
     * @param Request $request
     * @return JsonResponse
     */
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|exists:users,email',
            'password' => 'required|min:3'
        ], [
            'email.required' => 'Kolom email tidak boleh kosong.',
            'email.email' => 'Format email tidak valid.',
            'email.exists' => 'Email yang Anda masukkan belum terdaftar.',
            'password.required' => 'Kolom password tidak boleh kosong.',
            'password.min' => 'Password yang anda masukan minimal 3 karakter.',
        ]);

        if ($validator->fails()) {
            return $this->validationErrorResponse($validator->errors()->all(), 'Validation failed');
        }

        try {
            if (!$token = Auth::attempt($request->only('email', 'password'))) {
                return $this->errorResponse('Email atau password yang Anda masukkan salah.', 401);
            }

            $user = Auth::user();
            $roleName = $user->roles->first()->name ?? null;
            return $this->successResponse([
                'user' => [
                    'id' => $user->id,
                    'uuid' => $user->uuid,
                    'name' => $user->name,
                    'email' => $user->email,
                    'created_at' => $user->created_at,
                    'avatar' => $user->avatar,
                    'role' => $roleName,
                    'verified' => $user->verified,
                ],
                'access_token' => $token,
                'token_type' => 'Bearer',
            ]);
        } catch (\Exception $e) {
            return $this->errorResponse('Terjadi kesalahan server: ' . $e->getMessage(), 500);
        }
    }

    /**
     * Ambil data pengguna
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function me()
    {
        try {
            $user = Auth::user();
            if (!$user) {
                return $this->errorResponse('User tidak terautentikasi', 401);
            }
            $user = User::where('id', $user->id)->first();
            $roleName = $user->roles->first()->name ?? null;

            return $this->successResponse([
                'user' => [
                    'id' => $user->id,
                    'uuid' => $user->uuid,
                    'name' => $user->name,
                    'email' => $user->email,
                    'created_at' => $user->created_at,
                    'avatar' => $user->avatar,
                    'role' => $roleName,
                    'verified' => $user->verified,
                ],
            ]);
        } catch (\Exception $e) {
            return $this->errorResponse('Terjadi kesalahan server: ' . $e->getMessage(), 500);
        }
    }
    /**
     * Forgot password
     * @unauthenticated
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function forgotPassword(Request $request)
    {
        try {
            $validator = Validator::make(
                $request->all(),
                [
                    'email' => 'required|email|exists:users,email',
                ],
                [
                    'email.required' => 'Email permission required.',
                    'email.email' => 'Email permission must be email.',
                    'email.exists' => 'Email yang Anda masukkan belum terdaftar.',
                ]
            );
            if ($validator->fails()) {
                return $this->validationErrorResponse($validator->errors()->all(), 'Validation failed');
            }
            $user = User::where('email', $request->email)->first();
            if (!$user) {
                return $this->notFoundResponse('User not found');
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
     * Logout pengguna
     *
     * @return JsonResponse
     */
    public function logout()
    {
        try {
            Auth::logout();
            return $this->successResponse([]);
        } catch (\Exception $e) {
            return $this->errorResponse('Terjadi kesalahan: ' . $e->getMessage(), 500);
        }
    }

    /**
     * Refresh a token.
     *
     * @return JsonResponse
     */
    public function refresh()
    {
        try {
            $token = Auth::refresh();
            return $this->successResponse([
                'access_token' => $token,
                'token_type' => 'Bearer',
            ], 'Token berhasil diperbarui');
        } catch (\Throwable $th) {
            return $this->errorResponse('Gagal memperbarui token: ' . $th->getMessage(), 500);
        }
    }
}
