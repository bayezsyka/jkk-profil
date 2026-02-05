<?php
$article = \App\Models\Article::first();
if ($article) {
    echo "Raw: " . $article->getRawOriginal('thumbnail') . "\n";
    echo "Accessor: " . $article->thumbnail . "\n";
} else {
    echo "No articles found.\n";
}
