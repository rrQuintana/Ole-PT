"""initial migration

Revision ID: db0dcb63e281
Revises: e319acd25d73
Create Date: 2025-03-13 13:27:00.911136

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'db0dcb63e281'
down_revision: Union[str, None] = 'e319acd25d73'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    # ### commands auto generated by Alembic - please adjust! ###
    pass
    # ### end Alembic commands ###


def downgrade() -> None:
    """Downgrade schema."""
    # ### commands auto generated by Alembic - please adjust! ###
    pass
    # ### end Alembic commands ###
