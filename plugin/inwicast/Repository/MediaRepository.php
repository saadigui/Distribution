<?php

namespace Icap\InwicastBundle\Repository;

use Doctrine\ORM\EntityRepository;
use Icap\InwicastBundle\Entity\Media;

/**
 * MediaRepository.
 *
 * This class was generated by the Doctrine ORM. Add your own custom
 * repository methods below.
 */
class MediaRepository extends EntityRepository
{
    public function findByWidget($widgetInstance)
    {
        $qb = $this->_em->createQueryBuilder();
        $qb->select('media')
            ->from('Icap\InwicastBundle\Entity\Media', 'media')
            ->where('media.widgetInstance = :widgetinstance')
            ->setParameter('widgetinstance', $widgetInstance);

        $result = $qb->getQuery()->getResult();

        if (sizeof($result) > 0) {
            return $result[0];
        } else {
            return $result;
        }
    }
}
