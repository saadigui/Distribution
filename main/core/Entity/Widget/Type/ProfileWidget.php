<?php

namespace Claroline\CoreBundle\Entity\Widget\Type;

use Claroline\CoreBundle\Entity\User;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity()
 * @ORM\Table(name="claro_widget_profile")
 */
class ProfileWidget
{
    /**
     * An unique identifier for the widget.
     *
     * @ORM\Id()
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     *
     * @var int
     */
    private $id;

    /**
     * Display profile of the current user.
     *
     * @ORM\Column(type="boolean")
     *
     * @var bool
     */
    private $currentUser = true;

    /**
     * Choose the user to display in widget (if currentUser is false).
     *
     * @ORM\ManyToOne(targetEntity="Claroline\CoreBundle\Entity\User")
     * @ORM\JoinColumn(name="user_id", referencedColumnName="id", onDelete="SET NULL")
     *
     * @var User
     */
    private $user = null;

    /**
     * Get id.
     *
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Is current user displayed ?
     *
     * @return bool
     */
    public function isCurrentUser()
    {
        return $this->currentUser;
    }

    /**
     * Set current user.
     *
     * @param bool $currentUser
     */
    public function setCurrentUser($currentUser)
    {
        $this->currentUser = $currentUser;
        if ($this->currentUser) {
            // removes stored user as it's now useless
            $this->user = null;
        }
    }

    /**
     * Get user.
     *
     * @return User
     */
    public function getUser()
    {
        return $this->user;
    }

    /**
     * Set user.
     *
     * @param User $user
     */
    public function setUser(User $user = null)
    {
        $this->user = $user;
    }
}
