module.exports = {
  branches: ['main'],
  plugins: [
    {
      "path": "@semantic-release/commit-analyzer",
      "types": [
        {
          "type": "pr",
        }
      ]
    },    '@semantic-release/release-notes-generator',
    
    [
      "@semantic-release/changelog",
      {
        "changelogFile": "docs/CHANGELOG.md"
      }
    ],
    [
      "@semantic-release/git",
      {
        "assets": ["docs/CHANGELOG.md"]
      }
    ]
  ],
};

