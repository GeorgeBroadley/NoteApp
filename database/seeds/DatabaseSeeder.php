<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;
use App\User;
use App\CategoryType;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard();

        User::create(array(
            'name'     => 'George Broadley',
            'email'    => 'george@broadley.co',
            'password' => Hash::make('password')
        ));

        CategoryType::create(array(
            'name'       => 'Bookmarks',
            'table_name' => 'bookmarks',
        ));

        CategoryType::create(array(
            'name'       => 'Checklists',
            'table_name' => 'checklists',
        ));

        CategoryType::create(array(
            'name'       => 'Notes',
            'table_name' => 'notes',
        ));

        CategoryType::create(array(
            'name'       => 'Reminders',
            'table_name' => 'reminders',
        ));

        Model::reguard();
    }
}
