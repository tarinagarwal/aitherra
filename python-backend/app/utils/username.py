import random
import string
from prisma import Prisma

async def generate_unique_username(email: str, db: Prisma) -> str:
    """
    Generate a unique username from email.
    If username exists, append random numbers.
    """
    # Extract username from email (before @)
    base_username = email.split('@')[0].lower()
    
    # Remove special characters, keep only alphanumeric and underscore
    base_username = ''.join(c if c.isalnum() or c == '_' else '_' for c in base_username)
    
    # Try the base username first
    username = base_username
    existing_user = await db.user.find_unique(where={"username": username})
    
    # If username exists, append random numbers
    while existing_user:
        random_suffix = ''.join(random.choices(string.digits, k=4))
        username = f"{base_username}{random_suffix}"
        existing_user = await db.user.find_unique(where={"username": username})
    
    return username
