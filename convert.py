import json

def insert_path(tree, path):
    current = tree
    for part in path:
        # Find if current part exists
        existing = next((node for node in current if node["name"] == part), None)
        if not existing:
            existing = {"name": part, "children": []}
            current.append(existing)
        current = existing["children"]

def convert_taxonomy_to_tree(filepath):
    tree = []
    with open(filepath, "r", encoding="utf-8") as file:
        for line in file:
            line = line.strip()
            if line:
                parts = [p.strip() for p in line.split(">")]
                insert_path(tree, parts)
    return tree

# Usage
tree = convert_taxonomy_to_tree("taxonomy.txt")
with open("taxonomy.json", "w", encoding="utf-8") as f:
    json.dump(tree, f, indent=2)
