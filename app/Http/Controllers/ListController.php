<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Response;
use App\ListItem;
use Auth;

class ListController extends Controller
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
        $lists = ListItem::where('user_id', '=', $user)->where('category_id', '=', $id)->get();

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
        $note              = new ListItem;
        $note->user_id     = $user;
        $note->category_id = $request->category;
        $note->text        = $request->text;
        $note->save();

        return Response::json($note, 200);
    }

    public function destroy($id)
    {
        $note = ListItem::find($id);
        $note->delete();

        $notes = ListItem::all();

        return Response::json($notes, 200);
    }
}
