"""Image to news

Revision ID: 5e609fee2e79
Revises: 9d84a4a0c313
Create Date: 2020-06-27 10:30:06.265541

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '5e609fee2e79'
down_revision = '9d84a4a0c313'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('news', sa.Column('image', sa.String(), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('news', 'image')
    # ### end Alembic commands ###
