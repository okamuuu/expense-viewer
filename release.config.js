module.exports = {
  repositoryUrl: 'git@github.com:okamuuu/expense-viewer.git',
  branches: ['main'],
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@semantic-release/changelog',
  ],
};

