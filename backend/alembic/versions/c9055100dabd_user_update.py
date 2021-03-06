"""User update

Revision ID: c9055100dabd
Revises: 5786f9bdfa30
Create Date: 2020-05-31 18:33:30.984893

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'c9055100dabd'
down_revision = '5786f9bdfa30'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('surveys', sa.Column('created', sa.DateTime(), nullable=True))
    op.add_column('users', sa.Column('created', sa.DateTime(), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('users', 'created')
    op.drop_column('surveys', 'created')
    # ### end Alembic commands ###
