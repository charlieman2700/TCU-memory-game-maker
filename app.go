package main

import (
	"context"
	"fmt"

	"github.com/wailsapp/wails/v2/pkg/runtime"
)

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

// Greet returns a greeting for the given name
func (a *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}

func (a *App) SetDatabase() string {
	selection, err := runtime.OpenFileDialog(a.ctx, runtime.OpenDialogOptions{
		Title: "Select File",
		Filters: []runtime.FileFilter{
			{
				DisplayName: "Database File (*.db;*.sqlite)",
				Pattern:     "*.db;*.sqlite",
			},
		},
	})

	if err != nil {
		return "Error"
	}

	print("\n Selection")
	print(selection)
	print("\n ")

	// OpenDirectoryDialog()
	return "Hello"
	// return fmt.Sprintf("Hello %s, It's show time!", name)
}

func (a *App) CreateDatabase() string {

	selection, err := runtime.SaveFileDialog(a.ctx, runtime.SaveDialogOptions{
		Title: "Create Database",
		Filters: []runtime.FileFilter{
			{
				DisplayName: "Database File (*.db;*.sqlite)",
				Pattern:     "*.db;*.sqlite",
			},
		},
	})

	if err != nil {
		return "Error"
	}

	print("\n Selection")
	print(selection)
	print("\n ")

	// OpenDirectoryDialog()
	return "Hello"
	// return fmt.Sprintf("Hello %s, It's show time!", name)
}
