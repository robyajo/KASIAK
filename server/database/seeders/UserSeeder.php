<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Faker\Factory as Faker;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Creating Super Admin User
        $superAdmin = User::create([
            'name' => 'Saya',
            'email' => 's@s.com',
            'verified' => 'active',
            'password' => Hash::make('123456')
        ]);
        $superAdmin->assignRole('Super Admin');

        // Creating Admin User
        $admin = User::create([
            'name' => 'Ini Admin',
            'email' => 'a@a.com',
            'verified' => 'active',
            'password' => Hash::make('123456')
        ]);
        $admin->assignRole('Admin');

        // Creating Operator User
        $operator = User::create([
            'name' => 'Ini Operator',
            'email' => 'o@o.com',
            'verified' => 'active',
            'password' => Hash::make('123456')
        ]);
        $operator->assignRole('Operator');

        $faker = Faker::create();

        for ($i = 0; $i < 10; $i++) {
            $user = User::create([
                'name' => $faker->name,
                'email' => $faker->unique()->safeEmail,
                'verified' => 'inactive',
                'password' => Hash::make('password'),
            ]);
            $user->assignRole('Operator');
        }

        $user = User::create([
            'name' => 'User 1',
            'email' => 'u@u.com',
            'verified' => 'active',
            'password' => Hash::make('123456')
        ]);
        $user->assignRole('User');

        $user = User::create([
            'name' => 'User 2',
            'email' => 'u2@u.com',
            'verified' => 'active',
            'password' => Hash::make('123456')
        ]);
        $user->assignRole('User');
    }
}
