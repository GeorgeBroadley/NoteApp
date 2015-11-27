<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\User;
use App\Reminder;
use DateTime;
use Aloha\Twilio\Twilio;

class SendReminder extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'reminders';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Query Database and Send Reminders';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        // Get Current TimeStamp
        $date = new DateTime();

        $date = $date->format('Y-m-d H:i:00');

        // Get Reminders With TimeStamp
        $reminders = Reminder::where('reminder', '=', $date)->get();

        // Loop Through Reminders
        foreach ($reminders as $reminder) {
            // Get User for Reminder
            $user = User::where('id', '=', $reminder->user_id)->first();

            // Send Text to User with Reminder Text
            $twilio = new Twilio();

            $twilio->message($user->telephone, $reminder->text);
        }
        return "Sent Texts";
    }
}
