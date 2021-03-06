"""Required question

Revision ID: 93b1d61fbf0d
Revises: 5e609fee2e79
Create Date: 2020-06-27 13:02:47.314457

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '93b1d61fbf0d'
down_revision = '5e609fee2e79'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('questions', sa.Column('required', sa.Boolean(), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('questions', 'required')
    # ### end Alembic commands ###
