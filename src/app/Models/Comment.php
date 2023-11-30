<?php

namespace App\Models;

use CodeIgniter\Model;

class Comment extends Model
{
    protected $table = 'comments';
    protected $primaryKey = 'id';
    protected $useAutoIncreament = true;

    protected $allowedFields = ['name', 'text', 'date'];
}
