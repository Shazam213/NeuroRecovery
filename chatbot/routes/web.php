<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ChatController;

Route::view('/','home');

Route::post('/submit', [ChatController::class,'submit'])->name('submit');
