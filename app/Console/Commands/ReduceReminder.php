<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\User;
use App\Reminder;
use DateTime;
use DateInterval;

class ReduceReminder extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'reminders:reduce';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Decrement text sent value in database';

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
        $diff = new DateInterval('PT1H');

        $date = $date->sub($diff);

        $date = $date->format('Y-m-d H:i:00');

        // Get Reminders With TimeStamp
        $reminders = Reminder::where('reminder', '=', $date)->get();

        // Loop Through Reminders
        foreach ($reminders as $reminder) {
            // Get User for Reminder
            $user = User::where('id', '=', $reminder->user_id)->first();

            $user->textsent--;

            $user->save();
        }

        $reminders->delete();
        
        return "Sent Texts";
    }
}
