from flask import Blueprint, request
from flask_login import current_user, login_required
from app.models import db, Article
from app.forms import CreateArticle, EditArticle

article_routes = Blueprint("articles", __name__)

@article_routes.route("")
def get_articles():
    """Get all articles"""
    articles = Article.query.all()
    return {'articles': [a.to_dict() for a in articles]}

@article_routes("")
def get_4_articles():
    """Get 4 articles"""
    articles = Article.query.all().limit(4)
    return {'articles':[a.to_dict() for a in articles]}

@article_routes("/<int:id")
def get_article_by_id(id):
    """Get an article by the article's id"""
    articles = Article.query.filter_by(article_id=id)
    return {'articles':[a.to_dict() for a in articles]}

@article_routes("POST")
@login_required
def create_article():
    """Create an article"""
    form = CreateArticle()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        article = Article()
        form.populate_obj(article)

        db.session.add(article)
        db.session.commit()

        return article.to_dict()
    else:
        return {'errors': form.errors}, 400
