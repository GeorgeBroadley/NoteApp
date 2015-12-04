<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Response;
use App\Bookmark;
use Auth;

class BookmarkController extends Controller
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
        $user      = Auth::user()->id;
        $bookmarks = Bookmark::where('user_id', '=', $user)->where('category_id', '=', $id)->get();

        return Response::json($bookmarks, 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $bookmark              = new Bookmark;
        $bookmark->user_id     = Auth::user()->id;
        $bookmark->category_id = $request->category;
        $bookmark->title       = $request->title;
        $bookmark->url         = $request->url;
        $bookmark->save();

        return Response::json($bookmark, 200);
    }

    public function destroy($id)
    {
        $bookmark = Bookmark::find($id);
        $bookmark->delete();

        return Response::json('Note Deleted', 200);
    }
}
