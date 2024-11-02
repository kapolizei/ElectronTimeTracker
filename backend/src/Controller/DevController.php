<?php

namespace App\Controller;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class DevController extends AbstractController
{
    /**
     * @Route("/dev/{id}", name="app_dev")
     */
    public function index($id, EntityManagerInterface $objectManager): Response
    {
        $user = $objectManager->getRepository(User::class)->find($id);
        return $this->render('dev/index.html.twig', [
            'controller_name' => 'DevController',
            'id' => $id,
            'user' => $user,
        ]);
    }
}
