import { NextResponse, NextRequest } from 'next/server';
import simpleGit from 'simple-git';
import fs from 'fs/promises';
import path from 'path';
import os from 'os';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { repoUrl } = body;

    if (!repoUrl) {
      return NextResponse.json({ error: 'Repository URL is required' }, { status: 400 });
    }

    const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'git-'));
    
    try {
      const git = simpleGit();
      await git.clone(repoUrl, tempDir);

      const packageJsonPath = path.join(tempDir, 'package.json');
      const readmePath = path.join(tempDir, 'README.md');

      let packageJsonContent = {};
      let readmeContent = '';

      try {
        const packageJsonData = await fs.readFile(packageJsonPath, 'utf-8');
        packageJsonContent = JSON.parse(packageJsonData);
      } catch (error) {
        console.warn('Could not read package.json');
      }

      try {
        readmeContent = await fs.readFile(readmePath, 'utf-8');
      } catch (error) {
        console.warn('Could not read README.md');
      }

      // For now, just return the raw content
      return NextResponse.json({ packageJson: packageJsonContent, readme: readmeContent }, { status: 200 });

    } finally {
      await fs.rm(tempDir, { recursive: true, force: true });
    }

  } catch (error) {
    console.error('Failed to analyze repository:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
