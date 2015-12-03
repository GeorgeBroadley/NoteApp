<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Response;
use App\Reminder;
use Auth;
use DateTime;

class ReminderController extends Controller
{
    public function __construct()
    {
        $this->middleware('jwt.auth');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $user  = Auth::user()->id;
        $lists = Reminder::where('user_id', '=', $user)->where('category_id', '=', $id)->get();

        foreach ($lists as $list) {
            $list->reminder = DateTime::createFromFormat('Y-m-d H:i:s', $list->reminder)->format('d/m/Y H:i:s');
        }

        return Response::json($lists, 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $user              = Auth::user()->id;
        $note              = new Reminder;
        $note->user_id     = $user;
        $note->category_id = $request->category;
        $note->text        = $request->text;
        $note->reminder    = $request->date;
        $note->save();

        return Response::json($note, 200);
    }

    public function destroy($id)
    {
        $note = Reminder::find($id);
        $note->delete();

        $notes = Reminder::all();

        return Response::json($notes, 200);
    }
}
