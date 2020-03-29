"""create user  table

Revision ID: e7ff2674963b
Revises: 
Create Date: 2020-03-29 14:55:37.215934

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'e7ff2674963b'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        'users',
        sa.Column('id', sa.Integer, primary_key=True),
        sa.Column('sex', sa.String(50), nullable=False),
        sa.Column('age', sa.Unicode(200)),
    )


def downgrade():
    pass
