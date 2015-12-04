<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Response;
use App\Note;
use Auth;

class NoteController extends Controller
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
        $notes = Note::where('user_id', '=', $user)->where('category_id', '=', $id)->get();

        return Response::json($notes, 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $note              = new Note;
        $note->user_id     = Auth::user()->id;
        $note->category_id = $request->category;
        $note->title       = $request->title;
        $note->text        = $request->text;
        $note->save();

        return Response::json($note, 200);
    }

    public function destroy($id)
    {
        $note = Note::find($id);
        $note->delete();

        return Response::json('Note Deleted', 200);
    }
}
