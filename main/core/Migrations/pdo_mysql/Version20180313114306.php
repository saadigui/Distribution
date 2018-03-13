<?php

namespace Claroline\CoreBundle\Migrations\pdo_mysql;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated migration based on mapping information: modify it with caution
 *
 * Generation date: 2018/03/13 11:43:08
 */
class Version20180313114306 extends AbstractMigration
{
    public function up(Schema $schema)
    {
        $this->addSql("
            CREATE TABLE claro_widget_list (
                id INT AUTO_INCREMENT NOT NULL, 
                fetchUrl VARCHAR(255) NOT NULL, 
                filterable TINYINT(1) NOT NULL, 
                sortable TINYINT(1) NOT NULL, 
                paginated TINYINT(1) NOT NULL, 
                pageSize INT NOT NULL, 
                PRIMARY KEY(id)
            ) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB
        ");
        $this->addSql("
            CREATE TABLE claro_widget_profile (
                id INT AUTO_INCREMENT NOT NULL, 
                user_id INT DEFAULT NULL, 
                currentUser TINYINT(1) NOT NULL, 
                INDEX IDX_8F55951FA76ED395 (user_id), 
                PRIMARY KEY(id)
            ) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB
        ");
        $this->addSql("
            CREATE TABLE claro_widget_simple (
                id INT AUTO_INCREMENT NOT NULL, 
                content LONGTEXT NOT NULL, 
                PRIMARY KEY(id)
            ) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB
        ");
        $this->addSql("
            ALTER TABLE claro_widget_profile 
            ADD CONSTRAINT FK_8F55951FA76ED395 FOREIGN KEY (user_id) 
            REFERENCES claro_user (id) 
            ON DELETE SET NULL
        ");
    }

    public function down(Schema $schema)
    {
        $this->addSql("
            DROP TABLE claro_widget_list
        ");
        $this->addSql("
            DROP TABLE claro_widget_profile
        ");
        $this->addSql("
            DROP TABLE claro_widget_simple
        ");
    }
}
