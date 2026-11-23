#!/usr/bin/env python3
"""Build deterministic public archives from an explicit allowlist; no external dependencies."""
import hashlib
import json
from pathlib import Path
from zipfile import ZipFile, ZipInfo, ZIP_DEFLATED

ROOT = Path(__file__).resolve().parent.parent
VERSION = json.loads((ROOT / 'plugin.json').read_text())['version']
OUT = ROOT / 'dist'
OUT.mkdir(exist_ok=True)

def files_in(folder):
    return sorted(p for p in (ROOT / folder).rglob('*') if p.is_file())

def archive(name, entries):
    target = OUT / name
    with ZipFile(target, 'w', compression=ZIP_DEFLATED) as out:
        for source, destination in sorted(entries, key=lambda pair: pair[1]):
            assert not source.is_symlink() and ROOT in source.resolve().parents
            assert not source.name.startswith('.env')
            info = ZipInfo(destination, (2026, 11, 23, 0, 0, 0))
            info.compress_type = ZIP_DEFLATED
            info.external_attr = 0o100644 << 16
            out.writestr(info, source.read_bytes())
    with ZipFile(target) as check:
        assert check.testzip() is None
        assert len(check.namelist()) == len(entries)
        assert not any('marketplace' in f or '..' in Path(f).parts for f in check.namelist())
    return f'{hashlib.sha256(target.read_bytes()).hexdigest()}  {name}'

skill_files = files_in('skills/musvideo')
plugin_files = [ROOT / p for p in ['plugin.json', 'mcp.json', '.mcp.json', '.claude-plugin/plugin.json', 'LICENSE']] + skill_files
checksums = [
    archive(f'musvideo-plugin-{VERSION}.zip', [(p, 'musvideo/' + p.relative_to(ROOT).as_posix()) for p in plugin_files]),
    archive(f'musvideo-skill-{VERSION}.zip', [(p, 'musvideo/' + p.relative_to(ROOT / 'skills/musvideo').as_posix()) for p in skill_files]),
]
(OUT / 'SHA256SUMS').write_text('\n'.join(checksums) + '\n')
print('\n'.join(checksums))
