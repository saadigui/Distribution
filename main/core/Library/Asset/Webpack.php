<?php

/*
 * This file is part of the Claroline Connect package.
 *
 * (c) Claroline Consortium <consortium@claroline.net>
 *A
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Claroline\CoreBundle\Library\Asset;

use JMS\DiExtraBundle\Annotation as DI;

/**
 * @DI\Service("claroline.asset.webpack")
 */
class Webpack
{
    private $rootDir;
    private $assetCache;

    /**
     * Webpack constructor.
     *
     * @DI\InjectParams({
     *     "rootDir" = @DI\Inject("%kernel.root_dir%")
     * })
     *
     * @param string $rootDir
     */
    public function __construct($rootDir)
    {
        $this->rootDir = $rootDir;
    }

    /**
     * Exposes built assets with current version number for all webpack entries.
     *
     * @return array
     * @throws \Exception
     */
    public function getAssets()
    {
        if (!$this->assetCache) {
            $assetFile = $this->rootDir.'/../webpack-assets.json';
            $dllFile = $this->rootDir.'/../webpack-dlls.json';

            if (!file_exists($assetFile) || !file_exists($dllFile)) {
                throw new \Exception(sprintf(
                    'Cannot find webpack generated assets file(s). '
                    .'Make sure you have ran webpack with assets-webpack-plugin enabled.'
                ));
            }

            $dlls = json_decode(file_get_contents($dllFile), true);
            $assets = json_decode(file_get_contents($assetFile), true);
            $this->assetCache = array_merge_recursive($dlls, $assets);
        }

        return $this->assetCache;
    }
}
