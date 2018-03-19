<?php

/*
 * This file is part of the Claroline Connect package.
 *
 * (c) Claroline Consortium <consortium@claroline.net>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Claroline\CoreBundle\Manager;

use Claroline\AppBundle\Persistence\ObjectManager;
use Claroline\CoreBundle\Entity\Resource\Revision;
use Claroline\CoreBundle\Entity\Resource\Text;
use Claroline\CoreBundle\Entity\User;
use JMS\DiExtraBundle\Annotation as DI;

/**
 * @DI\Service("claroline.manager.text_manager")
 */
class TextManager
{
    private $om;

    /**
     * @DI\InjectParams({
     *       "om" = @DI\Inject("claroline.persistence.object_manager")
     * })
     */
    public function __construct(ObjectManager $om)
    {
        $this->om = $om;
    }

    public function create($content, $title, User $user = null)
    {
        $revision = new Revision();
        $revision->setContent($content);
        $revision->setUser($user);
        $text = new Text();
        $text->setName($title);
        $revision->setText($text);
        $this->om->persist($text);
        $this->om->persist($revision);
        $this->om->flush();

        return $text;
    }

    public function getLastContentRevision(Text $text)
    {
        $revisionRepo = $this->om->getRepository('ClarolineCoreBundle:Resource\Revision');

        return $revisionRepo->getLastRevision($text)->getContent();
    }

    public function createRevision(Text $text, $content, User $user = null)
    {
        $version = $text->getVersion() + 1;

        $revision = new Revision();
        $revision->setContent($content);
        $revision->setUser($user);
        $revision->setText($text);
        $revision->setVersion($version);
        $text->setVersion($version);
        $this->om->persist($revision);
        $this->om->persist($text);
//        $workspace = $old->getResourceNode()->getWorkspace();
//        $usersToNotify = $workspace ?
//            $this->container->get('claroline.manager.user_manager')
//                ->getUsersByWorkspaces(array($workspace), null, null, false) :
//            array();
//
//        $this->get('claroline.event.event_dispatcher')
//            ->dispatch(
//                'log',
//                'Log\LogEditResourceText',
//                array('node' => $old->getResourceNode(), 'usersToNotify' => $usersToNotify)
//            );
        $this->om->flush();

        return $revision;
    }
}
