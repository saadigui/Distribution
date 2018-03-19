<?php

/*
 * This file is part of the Claroline Connect package.
 *
 * (c) Claroline Consortium <consortium@claroline.net>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Claroline\CoreBundle\API\Serializer\Resource;

use Claroline\AppBundle\API\Serializer\SerializerTrait;
use Claroline\AppBundle\Persistence\ObjectManager;
use Claroline\CoreBundle\Entity\Resource\Revision;
use JMS\DiExtraBundle\Annotation as DI;

/**
 * @DI\Service("claroline.serializer.text.revision")
 * @DI\Tag("claroline.serializer")
 */
class TextRevisionSerializer
{
    use SerializerTrait;

    /** @var ObjectManager */
    private $om;

    /**
     * TextRevisionSerializer constructor.
     *
     * @DI\InjectParams({
     *     "om" = @DI\Inject("claroline.persistence.object_manager")
     * })
     *
     * @param ObjectManager $om
     */
    public function __construct(ObjectManager $om)
    {
        $this->om = $om;
//        $this->fileRepo = $om->getRepository('Claroline\CoreBundle\Entity\Resource\File');
//        $this->trackRepo = $om->getRepository('Claroline\VideoPlayerBundle\Entity\Track');
    }
//
//    /**
//     * @return string
//     */
//    public function getSchema()
//    {
//        return '#/main/core/resource/revision.json';
//    }
    /**
     * @return string
     */
    public function getClass()
    {
        return 'Claroline\CoreBundle\Entity\Resource\Revision';
    }

    /**
     * @param Revision $revision
     *
     * @return array
     */
    public function serialize(Revision $revision)
    {
        return [
            'id' => $revision->getId(),
            'content' => $revision->getContent(),
            'text' => [
                'id' => $revision->getText()->getId(),
            ],
            'meta' => [
                'version' => $revision->getVersion(),
            ],
        ];
    }
//
//    /**
//     * Deserializes data into a Track entity.
//     *
//     * @param \stdClass $data
//     * @param Track     $track
//     *
//     * @return Track
//     */
//    public function deserialize($data, Track $track)
//    {
//        if (empty($track)) {
//            $track = new Track();
//        }
//        $track->setUuid($data['id']);
//        $video = $this->fileRepo->findOneBy(['id' => $data['video']['id']]);
//        $track->setVideo($video);
//        $this->sipe('meta.label', 'setLabel', $data, $track);
//        $this->sipe('meta.lang', 'setLang', $data, $track);
//        $this->sipe('meta.kind', 'setKind', $data, $track);
//        $this->sipe('meta.default', 'setIsDefault', $data, $track);
//
//        if (isset($data['file'])) {
//            $trackFile = $this->fileManager->create(
//                new File(),
//                $data['file'],
//                $data['file']->getClientOriginalName(),
//                $data['file']->getMimeType(),
//                $video->getResourceNode()->getWorkspace()
//            );
//            $this->om->persist($trackFile);
//            $track->setTrackFile($trackFile);
//        }
//
//        return $track;
//    }
}
