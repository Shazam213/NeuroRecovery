<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class ChatController extends Controller
{
    // public function index()
    // {
    //     return view("");
    // }

    public function submit(Request $request)
    {
        // dd($request->input_box);
        $query= $request->input_box;
        $response = Http::post('http://127.0.0.1:5000/get-answer', [
            'query' => $query
        ]);

         if ($response->successful()) {
            $data = $response->json();
            return response()->json([
                'status' => 'success',
                'data' => $data
            ]);
        } 
        else {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to fetch data from endpoint'
            ], 500);
        }
    }
}
