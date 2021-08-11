create table UTILISATEUR(
  uuid binary(16) NOT NULL DEFAULT (UUID_TO_BIN(UUID())) comment 'Identifiant unique',
  pseudo VARCHAR(32) NOT NULL comment 'Pseudo',
  mail VARCHAR(32) NOT NULL comment 'Adresse mail',
  password VARCHAR(64) NOT NULL comment 'Mot de passe',
  date_creat DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP comment 'Date et heure de création',
	constraint PK_ID_UTILISATEUR primary key(uuid)
);