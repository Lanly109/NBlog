package githubAPI

import (
	"context"
	"encoding/base64"
	"fmt"

	"github.com/google/go-github/v45/github"
	"github.com/jamesruan/sodium"
)

func (c *githubClient) AddSecret(name string, value string) error {
	if c.publicKey == nil {
		var err error
		ctx := context.Background()
		c.publicKey, _, err = c.client.Actions.GetRepoPublicKey(ctx, c.userName, c.repoName)
		if err != nil {
			return err
		}
	}

	ctx := context.Background()
	var eSecret *github.EncryptedSecret = &github.EncryptedSecret{
		Name:           name,
		EncryptedValue: c.encrypt(value),
		KeyID:          *c.publicKey.KeyID,
	}
	_, err := c.client.Actions.CreateOrUpdateRepoSecret(ctx, c.userName, c.repoName, eSecret)
	return err
}

func (c *githubClient) encrypt(value string) string {
	var byteData sodium.Bytes = []byte(value)
	var pk sodium.BoxPublicKey
	key, err := base64.StdEncoding.DecodeString(*c.publicKey.Key)
	if err != nil {
		fmt.Println(err.Error())
	}
	pk.Bytes = sodium.Bytes(key)
	cm := byteData.SealedBox(pk)
	encodeString := base64.StdEncoding.EncodeToString(cm)
	return string(encodeString)
}
