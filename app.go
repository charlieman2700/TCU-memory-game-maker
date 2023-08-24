package main

import (
	"context"
	"fmt"

	"dev.com/tcu/database"
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

	if err != nil || selection == "" {
		runtime.MessageDialog(a.ctx, runtime.MessageDialogOptions{
			Type:    runtime.InfoDialog,
			Title:   "Database selection error",
			Message: "We coulnt mount database selected pls,try again",
		})
		return "Error"
	}

	runtime.MessageDialog(a.ctx, runtime.MessageDialogOptions{
		Type:    runtime.InfoDialog,
		Title:   "Database Selection",
		Message: "Database Selected Correctly",
	})
	println(selection)

	// OpenDirectoryDialog()
	return "OK"
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

	_, creationError := database.CreateNewDatabase(selection)
	if err != nil || creationError != nil {

		runtime.MessageDialog(a.ctx, runtime.MessageDialogOptions{
			Type:    runtime.InfoDialog,
			Title:   "Database selection error",
			Message: "Error Crearing Database, try again. If error persist try on another location",
		})
		return "ERR"
	}

	return "OK"
}

func (a *App) SelectImageFolder() string {

	selection, err := runtime.OpenDirectoryDialog(a.ctx, runtime.OpenDialogOptions{
		Title: "Select Image Folder",
	})

	if err != nil {
		runtime.MessageDialog(a.ctx, runtime.MessageDialogOptions{
			Type:    runtime.InfoDialog,
			Title:   "Folder selection error",
			Message: "Error selecting image folder, try again. If error persist try on another location",
		})

	}

	println(selection)

	return "OK"
}
