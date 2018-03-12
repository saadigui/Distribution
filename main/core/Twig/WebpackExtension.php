<?php

/*
 * This file is part of the Claroline Connect package.
 *
 * (c) Claroline Consortium <consortium@claroline.net>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Claroline\CoreBundle\Twig;

use Claroline\CoreBundle\Library\Asset\Webpack;
use JMS\DiExtraBundle\Annotation as DI;
use Symfony\Bridge\Twig\Extension\AssetExtension;

/**
 * @DI\Service("claroline.extension.webpack")
 * @DI\Tag("twig.extension")
 */
class WebpackExtension extends \Twig_Extension
{
    /** @var AssetExtension */
    private $assetExtension;

    /** @var Webpack */
    private $webpack;

    /**
     * WebpackExtension constructor.
     *
     * @DI\InjectParams({
     *     "extension" = @DI\Inject("twig.extension.assets"),
     *     "webpack"   = @DI\Inject("claroline.asset.webpack")
     * })
     *
     * @param AssetExtension $extension
     * @param Webpack        $webpack
     */
    public function __construct(AssetExtension $extension, $webpack)
    {
        $this->assetExtension = $extension;
        $this->webpack = $webpack;
    }

    public function getFunctions()
    {
        return [
            'hotAsset' => new \Twig_Function_Method($this, 'hotAsset'),
        ];
    }

    public function getName()
    {
        return 'webpack_extension';
    }

    /**
     * Returns the URL of an asset managed by webpack.
     *
     * @param string $path
     *
     * @return string
     *
     * @throws \Exception
     */
    public function hotAsset($path)
    {
        $assetName = pathinfo($path, PATHINFO_FILENAME);
        $assets = $this->webpack->getAssets();

        if (!isset($assets[$assetName])) {
            $assetNames = implode("\n", array_keys($assets));

            throw new \Exception(
                "Cannot find asset '{$assetName}' in webpack stats. Found:\n{$assetNames})"
            );
        }

        return $this->assetExtension->getAssetUrl(
            'dist/'.$assets[$assetName]['js']
        );
    }
}
