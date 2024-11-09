<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class ChatController extends Controller
{
    public function submit(Request $request)
    {
        $query = $request->input_box;

        // Prepare the request body
        $body = [
            'model' => 'llama2-7b-chat-Q5_K_M',
            'messages' => [
                [
                    'role' => 'system',
                    'content' => 'Answer the query in detail, give the answer in html format without the starting code block:'
                ],
                [
                    'role' => 'user',
                    'content' => $query
                ]
            ],
            'max_tokens' => 2048,
            'seed' => -1,
            'temperature' => 0.2,
            'top_k' => 40,
            'top_p' => 0.9
        ];

        // Make the POST request to the new API with the appropriate headers and body
        $response = Http::withHeaders([
            'Content-Type' => 'application/json',
            'Authorization' => 'Bearer 3FPMOECYMWFQKXNJKZNI2SXTLRNXCOFR5YRA' // Replace with your actual API key
        ])->post('https://api.vultrinference.com/v1/chat/completions', $body);

        // Handle the response
        if ($response->successful()) {
            // Extract the content from the response
            $data = $response->json();
            $answer = $data['choices'][0]['message']['content'];

            return response()->json([
                'status' => 'success',
                'data' => $answer
            ]);
        } else {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to fetch data from endpoint'
            ], 500);
        }
    }
}

