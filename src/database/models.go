package database

import "gorm.io/gorm"

type Category struct {
	gorm.Model
	Title       string
	Description string
}

type Game struct {
	gorm.Model
	Title       string
	Description string
	Categories  []Category `gorm:"many2many:game_categories;"`
}
