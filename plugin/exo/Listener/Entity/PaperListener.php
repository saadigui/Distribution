<?php

namespace UJM\ExoBundle\Listener\Entity;


use Claroline\CoreBundle\Event\AdminUserMergeActionEvent;
use Doctrine\ORM\Event\LifecycleEventArgs;
use JMS\DiExtraBundle\Annotation as DI;
use Symfony\Component\Translation\TranslatorInterface;
use UJM\ExoBundle\Manager\Attempt\PaperManager;


/**
 *
 * @DI\Service("ujm_exo.listener.entity_paper")
 * @DI\Tag("doctrine.entity_listener")
 */
class PaperListener
{

    /** @var PaperManager */
    private $manager;

    /** @var TranslatorInterface */
    private $translator;

    /**
     * @DI\InjectParams({
     *     "manager"    = @DI\Inject("ujm_exo.manager.paper"),
     *     "translator" = @DI\Inject("translator")
     * })
     */
    public function __construct(PaperManager $manager, TranslatorInterface $translator)
    {
        $this->manager = $manager;
        $this->translator = $translator;
    }

    /**
     * @DI\Observe("claroline_users_merge")
     */
    public function onMergeUsers(AdminUserMergeActionEvent $event)
    {
        // Replace paper user
        $count = $this->manager->replaceUser($event->getUserToRemove(), $event->getUserToKeep());

        $bundle_message = $this->translator->trans('merge_users_paper_success', ['%count%' => $count], 'ujm_exo');

        $event_message = $this->translator->trans(
            'merge_users_bundle_message_mask',
            [
                '%bundle_name%' => 'ExoBundle',
                '%bundle_message%' => $bundle_message,
            ],
            'platform'
        );

        $event->addMessage($event_message);
    }
}
