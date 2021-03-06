<?php

namespace Claroline\CoreBundle\API\Crud;

use Claroline\AppBundle\API\Options;
use Claroline\AppBundle\Event\Crud\CopyEvent;
use Claroline\AppBundle\Event\Crud\CreateEvent;
use Claroline\AppBundle\Event\Crud\DeleteEvent;
use Claroline\CoreBundle\Entity\User;
use Claroline\CoreBundle\Entity\Workspace\Workspace;
use Claroline\CoreBundle\Manager\WorkspaceManager;
use JMS\DiExtraBundle\Annotation as DI;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

/**
 * @DI\Service("claroline.crud.workspace")
 * @DI\Tag("claroline.crud")
 */
class WorkspaceCrud
{
    /**
     * WorkspaceCrud constructor.
     *
     * @DI\InjectParams({
     *     "manager" = @DI\Inject("claroline.manager.workspace_manager"),
     *     "tokenStorage" = @DI\Inject("security.token_storage")
     * })
     *
     * @param WorkspaceManager $manager
     */
    public function __construct(WorkspaceManager $manager, TokenStorageInterface $tokenStorage)
    {
        $this->manager = $manager;
        $this->tokenStorage = $tokenStorage;
    }

    /**
     * @DI\Observe("crud_pre_delete_object_claroline_corebundle_entity_workspace_workspace")
     *
     * @param DeleteEvent $event
     */
    public function preDelete(DeleteEvent $event)
    {
        $this->manager->deleteWorkspace($event->getObject());
    }

    /**
     * @DI\Observe("crud_pre_create_object_claroline_corebundle_entity_workspace_workspace")
     *
     * @param CreateEvent $event
     */
    public function preCreate(CreateEvent $event)
    {
        $workspace = $this->manager->createWorkspace($event->getObject());
        $user = $this->tokenStorage->getToken()->getUser();
        $workspace = $this->manager->copy($this->manager->getDefaultModel(), $workspace, false);

        if ($user instanceof User) {
            $workspace->setCreator($user);
            $workspace->addOrganization($user->getMainOrganization());
        }

        return $workspace;
    }

    /**
     * @DI\Observe("crud_pre_copy_object_claroline_corebundle_entity_workspace_workspace")
     *
     * @param CopyEvent $event
     */
    public function preCopy(CopyEvent $event)
    {
        $workspace = $event->getObject();
        $options = $event->getOptions();

        $new = $event->getCopy();
        $new->setName($workspace->getName());
        $new->setCode($workspace->getCode());

        $this->manager->copy($workspace, $new, in_array(Options::WORKSPACE_MODEL, $options));
    }
}
