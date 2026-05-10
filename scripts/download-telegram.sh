#!/usr/bin/env bash
# Скачивает публичный веб-архив канала (последние посты) в public/media/
# Запускайте У СЕБЯ на Mac: из корня проекта ./scripts/download-telegram.sh
# Нужен yt-dlp:  brew install yt-dlp   или   pip3 install --user yt-dlp

set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT="$ROOT/public/media"
mkdir -p "$OUT"

if ! command -v yt-dlp &>/dev/null; then
  echo "Установите yt-dlp:  brew install yt-dlp"
  exit 1
fi

echo "→ Качаю в $OUT (до 40 постов)…"
cd "$OUT"

# Плейлист публичного канала: /s/username
yt-dlp \
  --no-overwrites \
  -o "tg-%(id)s.%(ext)s" \
  "https://t.me/s/euroshtory_ru" \
  --playlist-end 40 \
  --retries 5 \
  --fragment-retries 5 \
  --socket-timeout 30

echo "→ Готово. Дальше: npm run media:sync"
