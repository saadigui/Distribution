<?php

namespace Claroline\ForumBundle\Listener;

use Claroline\CoreBundle\Event\AdminUserMergeActionEvent;
use Claroline\ForumBundle\Manager\Manager;
use Icap\NotificationBundle\Event\Notification\NotificationCreateDelegateViewEvent;
use JMS\DiExtraBundle\Annotation as DI;
use Symfony\Component\DependencyInjection\ContainerAware;
use Symfony\Component\Translation\TranslatorInterface;

/**
 * @DI\Service()
 */
class NotificationListener extends ContainerAware
{
    /** @var  \Claroline\ForumBundle\Manager\Manager */
    private $manager;

    /** @var TranslatorInterface */
    private $translator;

    /**
     * Constructor.
     *
     * @DI\InjectParams({
     *     "templating" = @DI\Inject("templating"),
     *     "manager"    = @DI\Inject("claroline.manager.forum_manager"),
     *     "translator" = @DI\Inject("translator")
     * })
     */
    public function __construct(
        $templating,
        Manager $manager,
        TranslatorInterface $translator
    ) {
        $this->templating = $templating;
        $this->manager = $manager;
        $this->translator = $translator;
    }

    /**
     * @param NotificationUserParametersEvent $event
     *
     * @DI\Observe("create_notification_item_resource-claroline_forum-create_message")
     */
    public function onCreateNotificationItem(NotificationCreateDelegateViewEvent $event)
    {
        $notificationView = $event->getNotificationView();
        $notification = $notificationView->getNotification();
        $content = $this->templating->render(
            'ClarolineForumBundle:Notification:notification.html.twig',
            array(
                'notification' => $notification,
                'status' => $notificationView->getStatus(),
                'systemName' => $event->getSystemName(),
            )
        );
        $event->setResponseContent($content);
        $event->stopPropagation();
    }

    /**
     * @DI\Observe("claroline_users_merge")
     */
    public function onMergeUsers(AdminUserMergeActionEvent $event)
    {
        // Replace notification user
        $count = $this->manager->replaceNotificationUser($event->getUserToRemove(), $event->getUserToKeep());

        $bundle_message = $this->translator->trans('merge_users_notification_success', ['%count%' => $count], 'forum');

        $event_message = $this->translator->trans(
            'merge_users_bundle_message_mask',
            [
                '%bundle_name%' => 'ForumBundle',
                '%bundle_message%' => $bundle_message,
            ],
            'platform'
        );

        $event->addMessage($event_message);
    }
}
