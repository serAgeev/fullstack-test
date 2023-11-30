<?php

namespace App\Controllers;
use App\Models\Comment;
use CodeIgniter\API\ResponseTrait;
use CodeIgniter\I18n\Time;

class CommentController extends BaseController
{
    use ResponseTrait;

    public function index()
    {
        $commentModel = model('Comment');
        $comments = $commentModel->findAll();

        return view('welcome_message', ['comments' => $comments]);
    }

	public function listAll()
	{
        $orderByType = $this->request->getVar('orderBy');
        $column = $this->request->getVar('column');
        $page = $this->request->getVar('page');
        $LIMIT = 3;

        $commentModel = model('Comment');
        $commentPaginateModel = $commentModel->orderBy($column, $orderByType);

        return $this->respond([
            'comments' => $commentPaginateModel->paginate($LIMIT, '', $page),
            'count' => $commentModel->get()->getNumRows(),
            'orderByType' => $orderByType,
            'column' => $column,
            'page' => $page,
            'limit' => $LIMIT,
        ]);
	}

    public function create()
    {
        $comment = model('Comment');

        $val = $this->validate([
            'name' => 'valid_email',
        ]);

        if (!$val) {
            return $this->respond([
                'error' => true,
            ]);
        }

        $data = [
            'name' => $this->request->getVar('name'),
            'text'  => $this->request->getVar('text'),
            'date'  => new Time('now'),
        ];

        return $this->respond([
            'error' => false,
            'result' => $comment->insert($data)
        ]);
    }

    public function delete($id)
    {
        $comment = model('Comment');

        return $this->respond([
            'error' => false,
            'result' => $comment->delete($id)
        ]);
    }
}
