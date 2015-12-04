<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Auth;
use App\Category;
use Response;
use App\Note;

class CategoryController extends Controller
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
    public function index()
    {
        $user       = Auth::user()->id;
        $categories = Category::where('user_id', '=', $user)->get();

        foreach ($categories as $category) {
            $noteCount = Note::where('category_id', '=', $category->id)->count();
            $category->count = $noteCount;
        }

        return Response::json($categories, 200);
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
        $category          = new Category;
        $category->user_id = $user;
        $category->name    = $request->name;
        $category->type    = $request->type;
        $category->save();

        $category->count = 0;

        return Response::json($category, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $category = Category::find($id);
        $category->delete();

        return Response::json('Note Deleted', 200);
    }
}
