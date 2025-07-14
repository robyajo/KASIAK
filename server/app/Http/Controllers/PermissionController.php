<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Traits\ApiResponse;
use Illuminate\Support\Facades\Validator;
use Spatie\Permission\Models\Permission;

class PermissionController extends Controller
{
    use ApiResponse;
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $data = Permission::orderBy('id', 'desc')
                ->select('id', 'name')
                ->get();
            return $this->successResponse($data, 'List Permission');
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
                'name' => 'required|unique:permissions,name|string|max:255',
            ],
            [
                'name.required' => 'Name permission required.',
                'name.unique' => 'Name permission must be unique.',
                'name.string' => 'Name permission must be string.',
                'name.max' => 'Name permission must be less than 255 characters.',
            ]
        );

        if ($validator->fails()) {
            return $this->validationErrorResponse($validator->errors()->all(), 'Validation failed');
        }

        try {
            $data = Permission::create(['name' => $request->name]);
            return $this->successResponse($data, 'Permission created successfully');
        } catch (\Throwable $th) {
            return $this->errorResponse($th->getMessage(), 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            $data = Permission::find($id)
                ->select('id', 'name')
                ->first();
            if (!$data) {
                return $this->notFoundResponse('Permission not found');
            }
            return $this->successResponse($data, 'Detail Permission');
        } catch (\Throwable $th) {
            return $this->errorResponse($th->getMessage(), 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'name' => 'required|unique:permissions,name|string|max:255',
            ],
            [
                'name.required' => 'Name permission required.',
                'name.unique' => 'Name permission must be unique.',
                'name.string' => 'Name permission must be string.',
                'name.max' => 'Name permission must be less than 255 characters.',
            ]
        );

        if ($validator->fails()) {
            return $this->validationErrorResponse($validator->errors()->all(), 'Validation failed');
        }

        try {
            $data = Permission::find($id);
            if (!$data) {
                return $this->notFoundResponse('Permission not found');
            }
            $data->update(['name' => $request->name]);
            return $this->successResponse($data, 'Permission updated successfully');
        } catch (\Throwable $th) {
            return $this->errorResponse($th->getMessage(), 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $data = Permission::find($id);
            if (!$data) {
                return $this->notFoundResponse('Permission not found');
            }
            $data->delete();
            return $this->successResponse([], 'Permission deleted successfully');
        } catch (\Throwable $th) {
            return $this->errorResponse($th->getMessage(), 500);
        }
    }
}
