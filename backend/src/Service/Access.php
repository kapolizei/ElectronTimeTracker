<?php

namespace App\Service;

use App\Entity\AccessToken;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;

class Access
{
    protected $em, $request;
    public function __construct(EntityManagerInterface $objectManager, RequestStack $requestStack)
    {
        $this->em = $objectManager;
        $this->request = $requestStack->getCurrentRequest();
    }

    public function validateUserRequest():User
    {
        $header = $this->request->headers->get('Authorization');
        if ($accessToken = $this->em->getRepository(AccessToken::class)->findOneBy(['token' => $header])) {
            return $accessToken->getUser();
        }
        throw new AccessDeniedHttpException();
    }
}