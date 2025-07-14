<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');
// Public routes
Route::prefix('auth')->controller(AuthController::class)->group(function () {
    Route::post('login', 'login');
    Route::post('register', 'register');
});

// Protected routes
Route::middleware('auth:api')->group(function () {
    // Auth routes
    Route::prefix('auth')->controller(AuthController::class)->group(function () {
        Route::post('logout', 'logout');
        Route::post('forgot-password', 'forgotPassword');
        Route::post('refresh', 'refresh');
        Route::get('me', 'me');
    });

    // User routes
    Route::middleware(['role:Super Admin|Admin'])->group(function () {
        Route::prefix('user')->controller(UserController::class)->group(function () {
            Route::get('index', 'index');
            Route::get('show/{uuid}', 'show');
            Route::post('store', 'store');
            Route::put('update/{uuid}', 'update');
            Route::post('change-password/{uuid}', 'changePassword');
            Route::post('upload-avatar/{uuid}', 'uploadAvatar');
            Route::delete('destroy/{uuid}', 'destroy');
        });
    });

    // Admin routes
    Route::middleware(['role:Super Admin'])->group(function () {
        // Roles resource
        Route::prefix('role')->controller(RoleController::class)->group(function () {
            Route::get('index', 'index');
            Route::get('show/{id}', 'show');
            Route::post('store', 'store');
            Route::put('update/{id}', 'update');
            Route::delete('destroy/{id}', 'destroy');
        });

        // Permissions resource
        Route::prefix('permission')->controller(PermissionController::class)->group(function () {
            Route::get('index', 'index');
            Route::get('show/{id}', 'show');
            Route::post('store', 'store');
            Route::put('update/{id}', 'update');
            Route::delete('destroy/{id}', 'destroy');
        });
    });
});
