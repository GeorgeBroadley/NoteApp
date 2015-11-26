<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;
use App\User;

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

        CategoryTypes::create(array(
            'name'       => 'Bookmarks',
            'table_name' => 'bookmarks',
        ));

        CategoryTypes::create(array(
            'name'       => 'Checklists',
            'table_name' => 'checklists',
        ));

        CategoryTypes::create(array(
            'name'       => 'Notes',
            'table_name' => 'notes',
        ));

        Model::reguard();
    }
}
