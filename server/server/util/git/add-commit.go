package git

import (
	"fmt"
	"io/ioutil"
	"os"
	"path/filepath"
	"time"

	"github.com/go-git/go-git/v5"
	. "github.com/go-git/go-git/v5/_examples"
	"github.com/go-git/go-git/v5/plumbing/object"
)

func GitAddCommit(directory string) err {
	// CheckArgs("<directory>")
	// directory := os.Args[1]

	r, err := git.PlainOpen(directory)
	CheckIfError(err)

	w, err := r.Worktree()
	CheckIfError(err)

	Info("git add all")
	err = w.AddWithOptions(&git.AddOptions{
		All: true,
	})

	CheckIfError(err)

	Info("git status --porcelain")
	status, err := w.Status()
	CheckIfError(err)

	fmt.Println(status)

	Info("git commit -m \"all commit\"")
	commit, err := w.Commit("all commit", &git.CommitOptions{
		All: true,
		Author: &object.Signature{
			Name:  "USERNAME",
			Email: "MAIL",
			When:  time.Now(),
		},
	})

	CheckIfError(err)

	Info("git show -s")
	obj, err := r.CommitObject(commit)
	CheckIfError(err)

	fmt.Println(obj)
	return err
}
