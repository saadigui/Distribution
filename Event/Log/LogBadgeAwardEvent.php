<?php

/*
 * This file is part of the Claroline Connect package.
 *
 * (c) Claroline Consortium <consortium@claroline.net>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Claroline\CoreBundle\Event\Log;

class LogBadgeAwardEvent extends LogGenericEvent
{
    const ACTION = 'badge-awarding';

    public function __construct($receiverGroup, $receiver)
    {
        parent::__construct(
            self::ACTION,
            array(
                'receiverUser' => array(
                    'lastName'  => $receiver->getLastName(),
                    'firstName' => $receiver->getFirstName()
                )
            ),
            $receiver
        );
    }

    /**
     * @return array
     */
    public static function getRestriction()
    {
        return array(self::DISPLAYED_WORKSPACE, self::DISPLAYED_ADMIN);
    }
}
