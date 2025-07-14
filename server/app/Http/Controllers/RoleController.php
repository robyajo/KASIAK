<?php

namespace App\Http\Controllers;

use App\Http\Traits\ApiResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Spatie\Permission\Models\Role;

class RoleController extends Controller
{
    use ApiResponse;
    public function index()
    {
        $data = Role::orderBy('id', 'desc')
            ->select('id', 'name')
            ->get();
        try {
            return $this->successResponse($data, 'List Role');
        } catch (\Throwable $th) {
            return $this->errorResponse($th->getMessage(), 500);
        }
    }
    public function show($id)
    {
        $data = Role::find($id)
            ->select('id', 'name')
            ->first();
        if (!$data) {
            return $this->notFoundResponse('Role not found');
        }
        try {
            return $this->successResponse($data, 'Detail Role');
        } catch (\Throwable $th) {
            return $this->errorResponse($th->getMessage(), 500);
        }
    }

    public function store(Request $request)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'name' => 'required|unique:roles,name|string|max:255',
                'permissions' => 'required|array',
            ],
            [
                'name.required' => 'Name role required.',
                'name.unique' => 'Name role must be unique.',
                'name.string' => 'Name role must be string.',
                'name.max' => 'Name role must be less than 255 characters.',
                'permissions.required' => 'Permissions role required.',
            ]
        );

        if ($validator->fails()) {
            return $this->validationErrorResponse($validator->errors()->all(), 'Validation failed');
        }

        $role = Role::create(['name' => $request->input('name')]);
        $role->syncPermissions($request->input('permission'));
        try {
            return $this->successResponse($role, 'Success');
        } catch (\Throwable $th) {
            return $this->errorResponse($th->getMessage(), 500);
        }
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'name' => 'required|unique:roles,name|string|max:255',
                'permissions' => 'required|array',
            ],
            [
                'name.required' => 'Name role required.',
                'name.unique' => 'Name role must be unique.',
                'name.string' => 'Name role must be string.',
                'name.max' => 'Name role must be less than 255 characters.',
                'permissions.required' => 'Permissions role required.',
            ]
        );

        if ($validator->fails()) {
            return $this->validationErrorResponse($validator->errors()->all(), 'Validation failed');
        }

        $role = Role::find($id);
        if (!$role) {
            return $this->notFoundResponse('Role not found');
        }
        $role->update(['name' => $request->input('name')]);
        $role->syncPermissions($request->input('permission'));
        try {
            return $this->successResponse($role, 'Success');
        } catch (\Throwable $th) {
            return $this->errorResponse($th->getMessage(), 500);
        }
    }

    public function destroy($id)
    {
        $data = Role::find($id);
        if (!$data) {
            return $this->notFoundResponse('Role not found');
        }
        try {
            $data->delete();
            return $this->successResponse([], 'Success delete role');
        } catch (\Throwable $th) {
            return $this->errorResponse($th->getMessage(), 500);
        }
    }
}
