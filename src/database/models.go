package database

type Category struct {
	ID          uint `gorm:"primaryKey"`
	Title       string
	Description string
	Games       []Game `gorm:"many2many:game_categories;"`
}

type Game struct {
	ID          uint `gorm:"primaryKey"`
	Title       string
	Description string
	Categories  []Category `gorm:"many2many:game_categories;"`
}
