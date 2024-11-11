<?php

namespace App\Entity;

use App\Repository\ProjectRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=ProjectRepository::class)
 */
class Project
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $title;

    /**
     * @ORM\ManyToMany(targetEntity=User::class, inversedBy="projects")
     */
    private $users;

    /**
     * @ORM\OneToMany(targetEntity=Task::class, mappedBy="project", orphanRemoval=true)
     */
    private $tasks;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $total_time;
    public function getTotalTime(): ?int
    {
        return $this->total_time;
    }

    public function setTotalTime(?int $total_time): self
    {
        $this->total_time = $total_time;
        return $this;
    }

    public function __construct()
    {
        $this->users = new ArrayCollection();
        $this->tasks = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;

        return $this;
    }

    /**
     * @return Collection<int, User>
     */
    public function getUsers(): Collection
    {
        return $this->users;
    }

    public function addUser(User $user): self
    {
        if (!$this->users->contains($user)) {
            $this->users[] = $user;
        }

        return $this;
    }

    public function removeUser(User $user): self
    {
        $this->users->removeElement($user);

        return $this;
    }

    /**
     * @return Collection<int, Task>
     */
    public function getTasks(): Collection
    {
        return $this->tasks;
    }

    public function addTask(Task $task): self
    {
        if (!$this->tasks->contains($task)) {
            $this->tasks[] = $task;
            $task->setProject($this);
        }

        return $this;
    }

    public function removeTask(Task $task): self
    {
        if ($this->tasks->removeElement($task)) {
            // set the owning side to null (unless already changed)
            if ($task->getProject() === $this) {
                $task->setProject(null);
            }
        }

        return $this;
    }


    public function toArray(): array
    {
        return [
            'project' => $this->getTitle(),
            'total_time' => $this->getTotalTime(),
            'id' => $this->getId(),
            'title' => $this->getTitle(),
        ];
    }

    public function reactStatisticArray(): array
    {
        return [
            'project title' => $this->getTitle(),
            'project id' => $this->getId(),
            'user' => $this->getUsers()->toArray(),
            'tasks' => $this->getTasks()->map(function ($task) {
                return $task->toArray();
            })->toArray(),
        ];
    }

    public function tasksArray(): array
    {
        return [
            'tasks' => $this->getTasks()->map(function ($task) {
                return $task->toArray();
            })->toArray(),
        ];
    }

}
